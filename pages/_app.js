import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '../UserProvider';

import { NhostProvider, NhostClient } from '@nhost/nextjs';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CustomLayout from "../styles/components/produc/index"
import   '../styles/pages/Home.module.css'
import   '../styles/pages/epigenitics.css'
import   '../styles/pages/hairBulbFolicle.css'
import   '../styles/pages/loginPage.css'
import   '../styles/pages/s_DriveTechnology.css'
import   '../styles/pages/product.styles.css'
import   '../styles/pages/wolfe.css'

export const nhost = new NhostClient({
  subdomain: 'ctzrqiexgysncscklyqy',
  region: 'eu-west-2'
});

// Get the authentication token from Nhost
// const token = nhost.auth.getJWTToken();

export const client = new ApolloClient({
  uri: "https://ctzrqiexgysncscklyqy.graphql.eu-west-2.nhost.run/v1",
  cache: new InMemoryCache(),
});


function MyApp({ Component, pageProps }) {
 
  return (
    
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <ApolloProvider client={client}>

        <UserProvider>
      {/* <CustomLayout> */}

          <Component {...pageProps} />
        {/* </CustomLayout> */}

          <Toaster />
        </UserProvider>

    </ApolloProvider>

    </NhostProvider>

  )
}

export default MyApp;
