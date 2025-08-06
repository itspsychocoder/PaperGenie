import mongoose,{Schema} from "mongoose";
import { int, string } from "zod";
import { required } from "zod/v4/core/util.cjs";


const assessmentSchema = new  Schema(

    {
assessmentTitle :{type:String, required : true},
subject :{type:String,required : true},
assessmentType :{type:String},
duration :{type:number},
difficultyLevel :{type:String, enum:["Easy","Midium","Hard","Mixed"] },
passingPercentage : {type : number , min : 0 , max : 100 , required : true },
numberOfQuestions : {type : number },
marksPerQuestion : { type : number },
topicsCovered : [{type : String}],
assessmentFile : { type :String,required: true}


    },
    {
        timestamps : true
    }

)
const Assessment = mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);

export default Assessment;