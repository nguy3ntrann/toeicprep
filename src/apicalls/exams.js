const { default: axiosInstance } = require(".");

export const addExam = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/exams/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllExams = async(payload) => {
  try{
    const response = await axiosInstance.post("/api/exams/get-all-exams")
    return response.data
  } catch(error){
    return error.response.data
  }
}

export const getExamById = async(payload) => {
  try{
    
  } catch(error){
    return error.response.data
  }
}
