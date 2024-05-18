const express =require('express')
const cors = require('cors');
const app=express();
app.use(cors());
app.use(express.json());

app.post('/calculate-loan', (req, res) => {
    const { amount } = req.body;
  
    let message;
    if (amount >= 50000) {
      message = 'Denied';
    } else if (amount >= 20000) {
      message = 'More information needed';
    } else {
      message = 'Approved';
    }
  
    res.json({ message });
  });


app.listen(5001,()=>{
    console.log("Server started at 5001");
})