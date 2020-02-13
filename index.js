var request = require('request')

const home = (request, response) => {
    try {
		response.json({"message":"Welcome To easygo Tourism"})                
    } catch (error) {
        response.status(403).json(error)
    }
}

const show_Destinations = (req, res) => {
    console.log("here")
    try {
        request.get("http://vlab42mys-03/intern1/data",(error,response,body)=>{
            var cost = JSON.parse(body).info.cost;
            console.log("Cost is "+cost);       

        })
    } catch (error) {
        response.status(403).json(error)
    }
}




module.exports = {
  home,
  show_Destinations
}
