import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '../UserProvider';
import Layout from "../components/Layout";

import { NhostProvider, NhostClient } from '@nhost/nextjs';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CustomLayout from "../styles/components/produc/index";
import { NhostApolloProvider } from '@nhost/react-apollo';
import { useRouter } from 'next/router';
import {CartItemsContextProvider} from "../store/Item"
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";

import   '../styles/pages/Home.module.css'
import   '../styles/pages/research.css'
import   '../styles/pages/product-details.css'
import   '../styles/pages/gut_support.css'
import   '../styles/pages/emf_and_elf_sensitivity.css'
import   '../styles/pages/epigenitics.css'
import   '../styles/pages/hairBulbFolicle.css'
import   '../styles/pages/loginPage.css'
import   '../styles/pages/s_DriveTechnology.css'
import   '../styles/pages/product.styles.css'
import   '../styles/pages/wolfe.css'
import   'rsuite/dist/rsuite.min.css';


export const nhost = new NhostClient({
  subdomain: 'ctzrqiexgysncscklyqy',
  region: 'eu-west-2'
});

export const client = new ApolloClient({
  uri: "https://ctzrqiexgysncscklyqy.graphql.eu-west-2.nhost.run/v1",
  cache: new InMemoryCache(),
});



function MyApp({ Component, pageProps }) {

  console.log("component and pageas", Component, pageProps)


  const router = useRouter()
  

  React.useEffect(()=>{
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  },[])

 
  return (
    <CartItemsContextProvider>

    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost} client={client}>

        <UserProvider>
      {/* <CustomLayout> */}
      {/* <Layout> */}

          <Component {...pageProps} />
        {/* </CustomLayout> */}
        {/* </Layout> */}
          <Toaster />
        </UserProvider>

    </NhostApolloProvider>

    </NhostProvider>
    </CartItemsContextProvider>

  )
}

export default MyApp;
