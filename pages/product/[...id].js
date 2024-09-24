import React from 'react'
import { detailsProduct } from '../function/apicall'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router' // Routing for next
import Link from 'next/link'
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';


const Details = () => {

    const router = useRouter()
    const { id } = router.query

    const getDetails = async () => {
        const response = await detailsProduct(id);
        console.log("Details Response...", response);
        return response
    }

    const { isLoading, isError, data: detailsData } = useQuery({
        queryKey: ["details", id],
        queryFn: getDetails
    })

    if (isLoading) {
        return <h1 style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>Loading...</h1>
    }

    // Using CSS Module 
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '800px',
            backgroundColor: '#f4f4f4',
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            padding: '20px',
            width: '300px',
            textAlign: 'center',
            marginTop: '50px'
        },
        image: {
            width: '100%',
            borderRadius: '8px',
        },
        title: {
            fontSize: '1.5em',
            margin: '10px 0',
        },
        price: {
            color: '#888',
            margin: '10px 0',
        },
        description: {
            fontSize: '0.9em',
            color: '#555',
        },
    };

    // MUI Area 
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
      });
      
      const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
          backgroundColor: purple[700],
        },
      }));

    return (
        <>
            <div style={styles?.container}>
                <div style={styles?.card}>
                    <img src={detailsData?.image} alt={detailsData?.title} style={styles?.image} />
                    <h2 style={styles?.title}>{detailsData?.title}</h2>
                    <p style={styles?.price}>Price: ${detailsData?.price}</p>
                    <p style={styles?.description}>{detailsData?.description}</p>
                    <Link href="/product">
                        <BootstrapButton variant="contained" disableRipple>
                            Back
                        </BootstrapButton>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Details
