function userMiddleWare(req,res,next){
  try {
    if(req.session.username){
      next()
    }else{
      res.status(401).json({error:"You're not logged in. Please Login in order do do that!"})
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
    
}

export default userMiddleWare;