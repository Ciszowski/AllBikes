import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import avatar from '../gallerie/avatar.jpg'
import { makeStyles } from '@material-ui/core/styles';

import {
    Card,
    CardHeader,
    CardMedia,
    cardContent,
    CardActions,
    Avatar,
    Typography,
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {},
    card: {
        maxWidth: 345
    }
}))

export default function MyProfile() {
    const classes = useStyle();
    const data = useSelector((state) => ( 
        {
            name: state.register.name,
            surname: state.register.surname,
            privilege: state.register.privilege,
            email: state.register.email,
    }))

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <img src={avatar} alt='avatar' />
                        </Avatar>
                    }
                    title="Mon Profile"
                    subheader={Date.now().toString()}

                    />
            </Card>
        </React.Fragment>
    )
}