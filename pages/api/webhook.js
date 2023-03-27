const { Pool } = require('pg');
const express = require('express');
import { buffer } from 'micro';
import Cors from 'micro-cors';
 
const app = express();

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
  });
  

 

export const config = {
    api: {
      bodyParser: false,
    },
  };
  


const webhook = async (req, res)  => {

  const buf = await buffer(req);

//   const stripe = require("stripe")("whsec_zQnKCbddcaaAg65xrkh04KmplbG4wnuy");whsec_eNuaTDmk7W1IfUaBAt2r1dWfJlA7ynKr
  const stripe = require("stripe")("sk_test_51MhnQJSG1kawF0cmcJ7aHuOic23iOFNbJOFfbZRz9Ac6KOGge98uSe9RERjMUMrZ8U7AOzqv088sqCRZl4uT0EEG000uFyqDOP");
  // const stripe = require("stripe")("sk_test_51MhnQJSG1kawF0cmcJ7aHuOic23iOFNbJOFfbZRz9Ac6KOGge98uSe9RERjMUMrZ8U7AOzqv088sqCRZl4uT0EEG000uFyqDOP");

  const sig = req.headers['stripe-signature'];

//   const rawBody = await getRawBody(req);

  
  const endpointSecret = 'whsec_4znrTomCPsXqTwoSYIPfUvC5G49CBpvF';
  // const endpointSecret = 'whsec_1491123cc83ee6b79094fb750e735abddba1188932c24a3ad2fa9b833744f580';
  
  let Event;
 
  console.log("RAW Headers",req,req.body)
  
  try {

    Event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);

    console.log('event ', req)

    const pool = new Pool({
          user: 'postgres',   // replace with your own PostgreSQL username
          host: 'ctzrqiexgysncscklyqy.db.eu-west-2.nhost.run',  // replace with your PostgreSQL host
          database: 'ctzrqiexgysncscklyqy',   // replace with the name of your PostgreSQL database
          password: 'Password@12345', // replace with your own PostgreSQL password
          port: 5432          // replace with the port number of your PostgreSQL server
        });

       
        // Handle the event
        const checkoutSession = Event?.data?.object;
        const paymentIntent = checkoutSession.payment_intent;
        const charge = paymentIntent?.charges?.data[0];
        const paymentStatus = Event?.data?.object?.payment_status;
        const status = Event?.data?.object?.status;

        const Data = Event?.data?.object;
        const metaData = Data?.metadata;
        
        
        // const webhookData = JSON.parse(req.body);

        let EventType = Event.type;
        console.log("checking data",Data,checkoutSession?.customer_details)

        const datasss = stripe.checkout.Session.retrieve(Data?.['id'])
        
        console.log('metadata above----------------22222222',datasss, EventType,Event?.data, Event?.data?.object?.status);

        let query ;

        console.log("STATUS IS ",checkoutSession?.type, paymentStatus, status,checkoutSession)
        
        if(EventType === "checkout.session.completed"){
          
            query = `UPDATE payments set status = '${paymentStatus}', order_id ='${metaData?.order_id}',   amount_subtotal='${checkoutSession?.amount_subtotal}',amount_discount='${checkoutSession?.total_details?.amount_discount}', customer_details='${JSON.stringify(checkoutSession?.customer_details)}'  ,amount_total='${checkoutSession?.amount_total}', event_object= '${JSON.stringify(checkoutSession)}', event= '${JSON.stringify(Event)}'   where id  = '${metaData.payment_id}'`

        }
        if(EventType === "payment_intent.payment_failed"){
          
          query = `UPDATE payments set status = 'failed', order_id ='${metaData?.order_id}',   amount_subtotal='${checkoutSession?.amount_subtotal}',amount_discount='${checkoutSession?.total_details?.amount_discount}', customer_details='${JSON.stringify(checkoutSession?.customer_details)}'  ,amount_total='${checkoutSession?.amount_total}', event_object= '${JSON.stringify(checkoutSession)}', event= '${JSON.stringify(Event)}'   where id  = '${metaData.payment_id}'`

      }

        if(EventType === "checkout.session.async_payment_failed"){
          
            query = `UPDATE payments set status'${paymentStatus}', order_id ='${metaData?.order_id}',  amount_subtotal='${checkoutSession?.amount_subtotal}',amount_discount='${checkoutSession?.total_details?.amount_discount}', customer_details='${JSON.stringify(checkoutSession?.customer_details)}'  ,amount_total='${checkoutSession?.amount_total}', event_object= '${JSON.stringify(checkoutSession)}', event= '${JSON.stringify(Event)}'   where id  = '${metaData.payment_id}'`

        }
        
        if(EventType === "checkout.session.async_payment_succeeded"){
          
            query = `UPDATE payments set status = '${paymentStatus}',order_id ='${metaData?.order_id}',       amount_subtotal='${checkoutSession?.amount_subtotal}',amount_discount='${checkoutSession?.total_details?.amount_discount}', customer_details='${JSON.stringify(checkoutSession?.customer_details)}'  ,amount_total='${checkoutSession?.amount_total}', event_object= '${JSON.stringify(checkoutSession)}', event= '${JSON.stringify(Event)}'   where id  = '${metaData.payment_id}'`

        }
        
        console.log("QUERY", query)
 
  const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(query);
        await client.query('COMMIT');
        console.log("Transaction completed successfully!");
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({
        //         message: 'Go Serverless v3.0! Your function executed successfully!',
        //         input: Event,
        //     }, null, 2),
        // };
       return res.status(200).send("Done")

    } catch (e) {
        console.log("Transaction failed:", e);
        await client.query('ROLLBACK');
        // return {
        //     statusCode: 400,
        //     body: JSON.stringify({
        //         message: 'Something went wrong',
        //         input: Event,
        //         error:e
        //     }, null, 2),
        // };
       return res.status(400).send("Webhook")


    } finally {
        client.release();
    }

 
  } catch (err) {
      console.log("error is", err)


      return res.status(400).send("Webhook")


        // return {
        //       statusCode: 400,
        //       body: JSON.stringify(
        //         {
        //           message: 'WebHook Error!',
        //           input: Event,
        //           error:err
        //         },
        //         null,
        //         2
        //       ),
        //     };
      
  }
 
};

export default webhook;