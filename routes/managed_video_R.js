const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const update = require('../middlewares/upload');

const video_M = require('../models/Videos_M');
const DB = require('../models/db');
const ShemaVideo = new video_M(DB);

router.get("/",(req, res) => {
    const pathClient = path.join(__dirname,"../views/main_crud.html" );
    res.sendFile(pathClient);
});

router.get('/List', async (req, res) => {
    try {
        const [AllVideos, _] = await ShemaVideo.GetAllVideos();
        res.status(200).json(AllVideos);
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "The request failed"
        });
    }
});

router.post('/Add', update.single('video'), async (req, res) => {
    try {
        const { filename } = req.file;
        const { name, abstract } = req.body;
        const pathFile = `/uploads/${filename}`;
        await ShemaVideo.AddVideo(name, pathFile, abstract);
        res.status(200).json({
            message: "The video has been successfully added"
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Add failed"
        });
    }
});

router.patch('/Edit',async (req, res) => {
    try {
        const {ID, NAME, ABSTEACT } = req.body;
        await ShemaVideo.UpdateVideo(ID, NAME, ABSTEACT);
        res.status(200).json({
            message: "The video has been successfully updated"
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "The update failed"
        });
    }
});

router.delete('/Delete', async (req, res) => {
    try {
        const { ID } = req.body;
        console.log(ID);
        const [fileData, _] = await ShemaVideo.GetVideo(ID);
        const pathFile = path.join(__dirname, "../public", fileData[0].path);
        fs.unlink(pathFile, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
              throw new Error();
            }
          });

         await ShemaVideo.DeleteVideo(ID);
        res.status(200).json({
            message: "The video has been successfully deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "The deletion failed"
        });
    }
});

router.get('/SHOW', (req,res) => {
    const indexPath = path.join(__dirname, '../public', 'video_project' ,'index.html');
    res.sendFile(indexPath);
});

module.exports = router;