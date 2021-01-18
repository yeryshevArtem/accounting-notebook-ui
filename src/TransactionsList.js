import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';
import TransactionsItem from './TransactionsItem';
import { DOMAIN_NAME} from './config';

const useStyles = createUseStyles({
    listGroupCustom: {
        margin: '10px 0'
    }
  });


function TransactionsList() {
    const classes = useStyles();
    const [history, setHistory] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(async () => {
        setLoading(true);
        try {
            const result = await axios.get(`${DOMAIN_NAME}/api/transactions-history`);
            setHistory(result.data);
            setLoading(false);
            setError(null);
        } catch(error) {
            setLoading(false);
            setError(error);
        }
    }, []);
    if (!history.length && !isLoading && !error) {
        return  (
            <Alert variant="light">
                 Is empty.
            </Alert>
        );
    }
    if (error && !isLoading) {
        return  (
            <Alert variant="danger">
                 Unexpected error.
            </Alert>
        );
    }

    return isLoading ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : history.map((transaction) => {
        return (        
            <ListGroup key={transaction.id} className={classes.listGroupCustom}>
                <TransactionsItem data={transaction} />
            </ListGroup>
        );
    })
}

export default TransactionsList;