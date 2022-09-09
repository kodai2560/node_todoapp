const Task= require("../models/task");



const getAllTasks =async(req, res) =>{
    try{
        const allTasks= await Task.find({});
        res.status(200).json(allTasks);
    }catch(err){
        res.status(500).json(err);
    }
}

const createTasks =async (req, res) =>{
    try{
        const createTasks= await Task.create(req.body);
        res.status(200).json(createTasks);
    }catch(err){
        res.status(500).json(err);
    }
    
}

const getSingleTasks =async(req, res) =>{
    try{
        const getSingleTasks= await Task.findOne({_id: req.params.id});        
        if(!getSingleTasks){
            return res.status(404).json(`_id:$${req.params.id}は存在しません`);
        }
        res.status(200).json(getSingleTasks);
    }catch(err){
        res.status(500).json(err);
    }
}
const updateTasks =async(req, res) =>{
    try{
        const updateTasks= await Task.findOneAndUpdate(
            {_id: req.params.id},
             req.body,
            {new: true});        
        if(!updateTasks){
            return res.status(404).json(`_id:$${req.params.id}は存在しません`);
        }
        res.status(200).json(updateTasks);
    }catch(err){
        res.status(500).json(err);
    }
}
const deleteTasks =async(req, res) =>{
    try{
        const deleteTasks= await Task.deleteOne(
            {_id: req.params.id},)        
        if(!deleteTasks){
            return res.status(404).json(`_id:$${req.params.id}は存在しません`);
        }
        res.status(200).json(deleteTasks);
    }catch(err){
        res.status(500).json(err);
    }
    
}

module.exports={
    getAllTasks,
    createTasks,
    getSingleTasks,
    updateTasks,
    deleteTasks
}