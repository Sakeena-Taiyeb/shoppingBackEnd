const express=require('express');
//adding a router to handle all our routes


const router = express.Router();
const Item = require('../model/shoppingItem');

router.get('/items',(req,res,next)=>{
//mongodb method to get all data
Item.find(function(err,items){
    if(err){
        res.json(err);
    }
    else
    {
        res.json(items);
    }
});
});
//Router for Inserting the data
router.post('/item',(req,res,next)=>{
    let newShoppingItem =new Item({
        itemName:req.body.itemName,
        itemQuantity:req.body.itemQuantity,
        itemBought: req.body.itemBought
    });
    newShoppingItem.save((err,item)=>{
        if (err){
            res.json(err);
        }
        else {
            res.json({msg:'Item has been added to the database'});
        }
    });
});
//to update an item
router.put('/item/:id',(req,res,next)=>{
    Item.findOneAndUpdate({_id:req.params.id},{ $set:{
itemName : req.body.itemName,
itemQuantity : req.body.itemQuantity,
itemBought : req.body.itemBought
}
    }, function(err,result){
        if(err){
   
            res.json(err);
        }
        else { 
            res.json(result);
        }
    
    
});
});
//delete method
router.delete('/item/:id',(req,res,next)=>{
    Item.findOneAndDelete({_id:req.params.id},
        function(err,result){
            if(err){
                res.json(err);
            }
            else{
            res.json(result);
        }
        
});
});
//defining some basic routes
router.get('/test',(req,res,next)=>{
    res.send('Testing Route');
});


module.exports=router;