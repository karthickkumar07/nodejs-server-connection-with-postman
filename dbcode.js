const Pool = require('pg').Pool
var request=require('request')
const pool1 = new Pool({
    user: 'easygouser1',
    host: 'vlab42mys-04',
    database: 'EasyGo',
    password: 'easygo@123',
    port: 5432,
    multipleStatements: true

})

//home route
const home = (request, response) => {
    try {
		response.json({"message":"Welcome To easygo Tourism"})                
    } catch (error) {
        response.status(403).json(error)
    }
}

const login = (request, response) => {
    try {
		  var customer_name = request.body.customer_name;
          var password =request.body.password;
		  
         pool1.query('SELECT * FROM customer where customer_name=$1 and password =$2', [customer_name,password], (error, results) => {
            console.log(results.rows)
                if(results.rows.length>0){
                    response.status(200).json({ "message": "User successfully logged in" })
                }
                else{
                    
                        // throw new Error()
                    response.json({"message":"User not found !"})
                    
                }
                
            })
                
    } catch (error) {
        response.status(403).json(error)
    }

}

const getUserDetails = (request, response) => {
    try {
		 var user_name = request.params.name;
		 console.log(user_name);
         pool1.query('SELECT * FROM customer where customer_name=$1', [user_name], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).json({"result": results.rows})
            })
                
    } catch (error) {
        response.status(403).json(error)
    }

}


const showDestinations = (request, response) => {
    try {
		pool1.query('SELECT * FROM "destination" ', (error, results) => {
                if (error) {
                    throw error
                }
				response.status(200).json({"result": results.rows})
            })
                
    } catch (error) {
        response.status(403).json(error)
    }

}


const showDestType = (request, response) => {
    try {
		 var travel_type= request.params.type;
         pool1.query('SELECT * FROM destination where typeoftravel=$1', [travel_type], (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).json({"result": results.rows})
            })
        //console.log("inside showdestid");
                
        }
     catch (error) {
        response.status(403).json(error)
    }
}
const showDestId =(request,response)=>{
    try{
        var travel_id=request.params.id;
        travel_id=parseInt(travel_id);
        pool1.query('SELECT * FROM destination where destination_id=$1',[travel_id],(error,results)=>{
            if(error){
                throw error;
            }
            //console.log("inside showdestid");
            response.status(200).json({"result":results.rows})
        })
    }
    catch (error) {
        response.status(403).json(error)
    
    }
    
} 
const bookTravel = (request, response) => {
    try {
		 const { customername,travellername,destination,typeofbooking,bookdate} = request.body;
         pool1.query('insert into travel(customername,travellername,destination,typeofbooking,bookdate) values ($1,$2,$3,$4,$5) ',[customername,travellername,destination,typeofbooking,bookdate]), (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).json({"result": results.rows})
            }
                
    } catch (error) {
        response.status(403).json(error)
    }

}
const mostvisit=(request,response)=>{
    try {
        pool1.query('select count(destination) as cc,destination as dd  from travel GROUP BY destination ORDER BY cc desc LIMIT 1', (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results);
            response.json(results.rows[0]);
            
        })
    } catch (error) {
        response.status(404).json(error);
    }

}
const givefeedback =(request,response)=>{
    try{
        const{cust_name,fb}=request.body;
        pool1.query('insert into feedback07(cust_name,fb) values ($1,$2)',[cust_name,fb]),(error,results)=>{
            if(error){
                throw error
            }
            response.status(200).json({"result":results.rows})
        }
    }catch (error) {
        response.status(403).json(error)
    }
}
const editbooking=(request,response)=>{
    try{
    var travel_id1=parseInt(request.params.travel_id);
    var dest=request.body.destination;
    pool1.query('UPDATE travel SET destination=$1 where travel_id=$2',[dest,travel_id1],(error,results)=>{
        if(error){
            throw error
        }
        response.status(200).json({"result":results.rows})
    })
    }
    catch (error) {
        response.status(403).json(error)
    }
    // pool1.query('select * from travel where travel_id=$1 ',[travel_id1]),(error,results)=>{
    //     try{
    //     if(results.rows.length>0){
    //         pool1.query('UPDATE travel SET destination =$1 where travel_id=$2',[dest,travel_id1]),(error,results)=>{
    //             if(error){
    //                 throw error
    //             }
    //             response.status(200).json({"result":results.rows})
    //         } 
        
    //     }
    // }catch (error) {
    //     response.status(403).json(error)
    // }
    

    // }
}

const cancelTravel = (request, response) => {
    try {
        var travel_id = parseInt(request.params.travel_id);
         pool1.query('DELETE FROM travel where travel_id=$1', [travel_id] , (error, results) => {
           
                if(results.rowCount>0){
                    response.status(200).json({"result": `Deleted travel details for travel Id ${travel_id}`})
                }
                else{
                    response.json({"message":"Invalid Error"})
                }
            })
                
    } catch (error) {
        response.status(403).json(error)
    }

}




module.exports = { 
home,
login,
showDestinations,
showDestType,
getUserDetails,
bookTravel,
cancelTravel,
showDestId,
givefeedback,
editbooking,
mostvisit
}