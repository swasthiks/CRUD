$("#add_user").submit(function(event){
    alert("DATA INSERTED SUCCESSFULLY");
})
$("#update_user").submit(function(event){
    event.preventDefault();
    var unindexed_array=$(this).serializeArray();
    var data={}
    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
    })
    console.log(data);
    var request={
        "url":`http://localhost:3000/api/user/${data.id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("DATA UPDATED SUCCESSFULLY");
    })
})
if(window.location.pathname=="/"){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id")
        var request={
            "url":`http://localhost:3000/api/user/${id}`,
            "method":"DELETE",
            
        }
        if(confirm("DO YOU REALLY WANT TO DELETE THIS RECORD?")){
            $.ajax(request).done(function(response){
                alert("DATA DELETED SUCCESSFULLY");
                location.reload()
            })
        }
    })
}