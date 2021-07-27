const mongoose =require('mongoose')
const express = require('express')

const trees=express()

const structure = require('./schema.js')
const { db } = require('./schema.js')
const { ObjectId } = require('mongodb')
// Get method to fetch all the data stored in the database
    trees.get('/',async (req,res) =>{
        
        try{
            const plant = await structure.find()
            res.json(plant)
        }
        catch(err){
            res.status(400).send("Invalid input")
        }
    })
// Get by id 
    trees.get('/:id',async (req,res) =>{
        
        try{
            const plant = await structure.findById(req.params.id)
            res.json(plant)
        }
        catch(err){
            res.status(400).send("Invalid input")
        }
})
// Post method to add data
    trees.post('/',async (req,res) =>{
        
        const plant = new structure({
            title : req.body.title,
            description : req.body.description
        })
        try{
            const a1 = await plant.save()
            res.send(a1)
        }
        catch(err)
        {
            res.send('Error')
        }  
    })
// Edit the data by id
trees.patch('/:id',async (req,res) =>{
    try{
        const id =req.params.id
        const updates= req.body
        const options ={new : true}

        const result = await structure.findByIdAndUpdate(id,updates,options)
        res.send("Successfully Changed")
    }
    catch(err){
        res.send(error.message)
    }
})
trees.delete('/:id',async (req,res,next) =>{
    try{
        const id = req.params.id
    
        const result = await structure.findByIdAndDelete(id)
        res.send("Successfully Deleted")
    }
    catch(error)
    {
        res.send(error.message)
    }
})

module.exports = trees;
