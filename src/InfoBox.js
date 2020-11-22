import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core';
import './InfoBox.css';

function InfoBox({title,cases,total,isRed,active,...props}) {
    console.log(title,active);
    return (
    <Card 
    onClick={props.onClick}
    className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
        <CardContent>
    <Typography color="textSecondary">{title}</Typography>
            {/* Title */}
    <h2 className={`infoBox___cases ${!isRed && "info__cases--green"}`}>{cases}</h2>
            {/* No. of cases */}
    <Typography className="infoBox__total" color="textSecondary"> {total} Total</Typography>
            {/* Total */}
        </CardContent>
    </Card>
    )
}

export default InfoBox;
