import React, { useState } from "react"
import { fetchProduct } from "../function/apicall"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link";
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const index = () => {

    const [visibleProducts, setVisibleProducts] = useState(Array(20).fill(false)); // Track visibility of products

    const getData = async () => {
        const response = await fetchProduct();
        console.log("My Product Response...", response);
        return response
    }

    const { isLoading, isError, data: products } = useQuery({
        queryKey: "product",
        queryFn: getData
    })

    const handleCellClick = (index) => {
        setVisibleProducts((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index]; // Toggle visibility
            return updated;
        });
    };

    if (isLoading) {
        return <h1 style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>Loading...</h1>
    }

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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
                <table style={{ borderCollapse: "collapse" }}>
                    <tbody>
                        {Array.from({ length: 4 }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: 5 }).map((_, colIndex) => {
                                    const productIndex = rowIndex * 5 + colIndex;
                                    return (
                                        <td
                                            key={colIndex}
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                backgroundColor: visibleProducts[productIndex] ? "white" : "black",
                                                color: visibleProducts[productIndex] ? "black" : "white",
                                                textAlign: "center",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                border: `1px solid ${visibleProducts[productIndex] ? "black" : "white"}`, // Change border color
                                            }}
                                            onClick={() => handleCellClick(productIndex)}
                                        >
                                            {productIndex < products.length && visibleProducts[productIndex] ? (
                                                <>
                                                    <h4>{products[productIndex].title}</h4>
                                                    <img src={products[productIndex].image} alt={products[productIndex].title} style={{ width: "50px" }} />
                                                    <p>Price: ${products[productIndex].price}</p>
                                                    <Link href={`/product/${products[productIndex].id}`}><BootstrapButton variant="contained" disableRipple>
                                                        Details
                                                    </BootstrapButton></Link>
                                                </>
                                            ) : (
                                                productIndex < products.length && <span>Product {productIndex + 1}</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default index