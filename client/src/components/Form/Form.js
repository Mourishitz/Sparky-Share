import useStyles from "./styles";
import FileBase from "react-file-base64";
import React, { useState, useEffect } from "react";
import {useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts"
import { TextField, Button, Typography, Paper } from "@material-ui/core";

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const [ postData, setPostData ] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''});

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }

        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})
    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete={"off"} noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant={"h6"}>{currentId ? 'Atualize' : 'Crie'} um Sparky</Typography>
                <TextField label={"Autor"} name={"creator"} variant={"outlined"} fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/>
                <TextField label={"Título"} name={"title"} variant={"outlined"} fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField label={"Mensagem"} name={"message"} variant={"outlined"} fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField label={"Tags"} name={"tags"} variant={"outlined"} fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })}/>
                <div className={classes.fileInput}>
                    <FileBase type={"file"} multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Enviar</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Apagar</Button>
            </form>
        </Paper>
    );
}

export default Form;