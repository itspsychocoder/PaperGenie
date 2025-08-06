import mongoose,{Schema} from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const assessmentSchema = new  Schema(

    {
assessmentTitle :{type:String, required : true},
subject :{type:String,required : true},
assessmentType :{type:String},
duration : {type : Number},
difficultyLevel :{type:String, enum:["Easy","Medium","Hard","Mixed"] },
passingPercentage : {type : Number , min : 0 , max : 100 , required : true },
numberOfQuestions : {type : Number },
marksPerQuestion : { type : Number },
topicsCovered : [{type : String}],
assessmentFile : { type :String,required: true},
createdBy: {type : Schema.Types.ObjectId,ref:"User"},



    },
    {
        timestamps : true
    }

)
// assessmentSchema.plugin(mongooseAggregatePaginate)

const Assessment = mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);

export default Assessment;