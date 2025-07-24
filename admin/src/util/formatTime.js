import moment from "moment"
moment.locale("zh-cn");
const formatTime={
    getTime:(data)=>{
        //
        return moment(data).format('MMMM Do YYYY, h:mm:ss a')
    }
}

export default formatTime