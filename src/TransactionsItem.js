import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Accordion, Card, Button } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
import { DateTime } from 'luxon';

const useStyles = createUseStyles({
    base: {
        width: 500,
        margin: '0 auto'
    },
    creditStyles: {
        extend: 'base',
        backgroundColor: '#11E43E',

    },
    debitStyles: {
        extend: 'base',
        backgroundColor: '#FF5733'
    }
  });

function TransactionsItem({ data }) {
    const classes = useStyles();
    const symbol = data.type === 'credit' ? '+' : '-';
    const styles = data.type === 'credit' ? classes.creditStyles : classes.debitStyles;
    const formattedEffectiveDate = DateTime.fromISO(data.effectiveDate).toLocaleString(DateTime.DATETIME_FULL);
    return (
        <ListGroup.Item className={styles}>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <span>{data.type}: </span>{symbol}<span>{data.amount}</span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <p><strong>Transaction ID</strong>: {data.id}</p>
                            <p><strong>Transaction type</strong>: {data.type}</p>
                            <p><strong>Amount</strong>: {data.amount}</p>
                            <p><strong>Effective Date</strong>: {formattedEffectiveDate}</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </ListGroup.Item>
    );
};

export default TransactionsItem;