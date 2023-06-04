let currentPage =1
window.addEventListener('scroll',function(){
  
  if (window.scrollY + window.innerHeight +1 >= document.documentElement.scrollHeight){
    get_post(currentPage +1 ,false)
    currentPage++
  }
})
function get_post(page =1 ,reload=true){
  toogleshow(false)
  
axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=15&page=${page}`)
  .then(function (response) {
    toogleshow(false)
    let posts= response.data.data;
    // if(reload){
    //   document.querySelector('.all').innerHTML =""
    // }
    for(post of posts){
      let post45=JSON.parse(localStorage.getItem('user'));
      // let mypost= post45author.username ==null && post45.id == post.author.id;
      // console.log(mypost)
      let cotn=``;
      // if (mypost){
        // cotn=`<button class='btn btn-secondary' style='float: right' onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post45))}')">edit</button>`
        // document.querySelector('card-header').innerHTML +=cotn;
      // }
        document.querySelector('.all').innerHTML +=`
        <div class="container" style="height: 690px;">
        <div class="posts${post.id}" >
            <div class="d-flex justify-content-center">
            <div class="col-9">
                <div class="card shadow">
                    <div class="card-header">
                        <img class="rounded-circle border border-3" src="${post.author.profile_image}" alt="" width="40px" height="40px">
                        <h2 class="fs-6 d-inline fw-bolder">${post.author.username}</h2>
                      
                    </div>
                    <div class="card-body">
                      <img class="w-100" src="${post.image}" alt="" width="938px" height="400px">
                      <h6 class="mt-2" style="color:gray;">${post.created_at}</h6>
                      <h5>${post.title}</h5>
                      <p>
                        ${post.title}
                      </p>
  
                      <hr>
  
                      <div class="d-inline">
                        <svg style="cursor: pointer;" onclick="comment(${post.id})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                        </svg>
                        <span style="cursor: pointer;" onclick="comment(${post.id})">${post.comments_count} Comment</span> 
                        <span id="tags${post.id}">
                        </span>
                      </div>
                    </div>
                  </div>
            </div>
        </div>
        </div>
    </div>`
    // document.querySelector('#tags').innerHTML +=`<button class="btn btn-sm rounded-5" style="background-color: #949090; color:white;">policy</button>`

    if(post.tags.length != 0){
      for(tag of post.tags){
        var tagscontent = 
        `<button class="btn btn-sm rounded-5" style="background-color: #949090; color:white;">
            ${tag.name}
        </button>`
        document.querySelector('#tags'+post.id).innerHTML +=tagscontent;
      }
    }
      // tag.name
      // if(tag.name != "undefined")
      // console.log(tag)

    // }
    }

    // document.querySelector('.card-header h2').textContent=response.data.data[0].author.username;
    // document.querySelector('.card-header img').src=response.data.data[0].author.profile_image;
    // document.querySelector('.card-body img').src=response.data.data[0].image;
    // document.querySelector('.card-body h6').textContent=response.data.data[0].created_at;
    // document.querySelector('.card-body h5').textContent=response.data.data[0].title
    // document.querySelector('.card-body p').textContent=response.data.data[0].body
    // document.querySelector('.d-inline span').textContent=response.data.data[0].comments_count + ' Comments'
  })
  .catch(function (error) {
    console.log(error);
  });
}
function toogleshow(toogle){
  if(toogle==false){
    document.querySelector('.lds-default').style.display='none'
  }else{
    document.querySelector('.lds-default').style.display='flex'
  }
}
get_post()
  function registreusers(){
    const name=document.querySelector('#registre-name-name').value;
    const username=document.querySelector('#registre-Username-name').value;
    const password=document.querySelector('#registre-Password-name').value;
    const imgre=document.querySelector('#image-registre').files[0];
    const reForm=new FormData()
    reForm.append("name",name)
    reForm.append("username",username)
    reForm.append("password",password)
    reForm.append("image",imgre)
    toogleshow(false)
    axios.post('https://tarmeezacademy.com/api/v1/register',reForm) 
    .then(function (response) {
      document.querySelector('#alerts').innerHTML +='<div id="registre" style="position: fixed; z-index: 99999; width: 30%; right: 0;top: 91%; "></div>'
      localStorage.setItem('token',response.data.token)
      localStorage.setItem('user',JSON.stringify(response.data.user))
      let model=document.querySelector('#registre-model');
      const modelInstance=bootstrap.Modal.getInstance(model);
       const alertPlaceholder = document.getElementById('registre')
      const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')
      
        alertPlaceholder.append(wrapper)
      }
      document.querySelector('#profil').innerHTML =`
      <img class="rounded-circle border border-3" src="${response.data.user.profile_image}" alt="" width="40px" height="40px">
      <h2 class="fs-6 d-inline fw-bolder" style="margin: 9px;">${response.data.user.username}</h2>`
      modelInstance.hide()
      document.querySelector('#Registre').style.visibility="hidden"
      document.querySelector('#Login').style.visibility="hidden"
      document.querySelector('#logout').style.display="block"
        const alertToHide=bootstrap.Alert.getOrCreateInstance('#registre')
        appendAlert('Nice, you Registre is successful', 'success')
          setTimeout(() => {
            alertToHide.close()
          }, 2000);   
      
    })
    .catch(function (error) {
      console.log(error.response.data.message);
      document.querySelector('#alerts').innerHTML +='<div id="insucss" style="position: fixed; z-index: 99999; width: 30%; right: 0;top: 91%; "></div>'
      const alertPlaceholder = document.getElementById('insucss')
      const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '</div>'
        ].join('')
      
        alertPlaceholder.append(wrapper)
        
      }
      
        appendAlert(error.response.data.message, 'danger')
    
    
        const alertToHide=bootstrap.Alert.getOrCreateInstance('#insucss')
          setTimeout(() => {
            alertToHide.close()
          }, 4000);
    });
  }  
function comment(id){
  window.location= `comment.html?postid=${id}`
}
function loginusers(){
  const username=document.querySelector('#Username-name').value;
  const password=document.querySelector('#Password-name').value;
  toogleshow(false)
  axios.post('https://tarmeezacademy.com/api/v1/login',{
    "username" : username ,
    "password" : password
}) 
  .then(function (response) {
    document.querySelector('#alerts').innerHTML +='<div id="sucss" style="position: fixed; z-index: 99999; width: 30%; right: 0;top: 91%; "></div>'
    localStorage.setItem('token',response.data.token)
    document.querySelector('#profil').innerHTML =`
    <img class="rounded-circle border border-3" src="${response.data.user.profile_image}" alt="" width="40px" height="40px">
    <h2 class="fs-6 d-inline fw-bolder" style="margin: 9px;">${response.data.user.username}</h2>`
    localStorage.setItem('user',JSON.stringify(response.data.user))
    let model=document.querySelector('#login-model');
    const modelInstance=bootstrap.Modal.getInstance(model);
     const alertPlaceholder = document.getElementById('sucss')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }
    modelInstance.hide()
    document.querySelector('#Registre').style.visibility="hidden"
    document.querySelector('#Login').style.visibility="hidden"
    document.querySelector('#logout').style.display="block"
      const alertToHide=bootstrap.Alert.getOrCreateInstance('#sucss')
      appendAlert('Nice, you Login is successful', 'success')
        setTimeout(() => {
          alertToHide.close()
        }, 2000);   
    
  })
  .catch(function (error) {
    document.querySelector('#alerts').innerHTML +='<div id="inlogin" style="position: fixed; z-index: 99999; width: 30%; right: 0;top: 91%; "></div>'
    const alertPlaceholder = document.getElementById('inlogin')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
      
    }
    
      appendAlert(error.response.data.message, 'danger')
  
  
      const alertToHide=bootstrap.Alert.getOrCreateInstance('#inlogin')
        setTimeout(() => {
          alertToHide.close()
        }, 4000);
  });
  
    
}  
function createpost(){
  // if(localStorage.getItem('token') && localStorage.getItem('user')){
    const formFile=document.querySelector('#image-post-name').files[0];
    const title=document.querySelector('#title-post-name').value;
    const text=document.querySelector('#Body-post-name').value;
    var token=localStorage.getItem('token')
    
    if(iscreate){
      let postid=document.querySelector('#post-id-input').value
      const Form=new FormData()
      const header={
        "authorization":`Bearer ${token}`
      }
    Form.append('title',title)
    Form.append('body',text)
    Form.append('image',formFile)
  axios.post('https://tarmeezacademy.com/api/v1/posts',Form,{
    headers:header 
}) 
  .then(function (response) {
    document.querySelector('#alerts').innerHTML +='<div id="sucsspost" style="position: fixed; z-index: 99999; width: 30%; right: 0;top: 91%; "></div>'
    console.log(response)
    let model=document.querySelector('#create-model');
    const modelInstance=bootstrap.Modal.getInstance(model);
     const alertPlaceholder = document.getElementById('sucsspost')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }

    modelInstance.hide()
    document.querySelector('#Registre').style.visibility="hidden"
    document.querySelector('#Login').style.visibility="hidden"
    document.querySelector('#logout').style.display="block"
      const alertToHide=bootstrap.Alert.getOrCreateInstance('#sucsspost')
      appendAlert('Nice, your post been created', 'success')
        setTimeout(() => {
          alertToHide.close()
        }, 2000);   
    
  })
  .catch(function (error) {
    // console.log(error)
    document.querySelector('#alerts').innerHTML +='<div id="create" style="position: fixed; z-index: 99999; width: 30%; right: 0;top: 91%; "></div>'
    const alertPlaceholder = document.getElementById('create')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
      
    }
    
      appendAlert(error.response.data.message, 'danger')

  
      const alertToHide=bootstrap.Alert.getOrCreateInstance('#create')
        setTimeout(() => {
          alertToHide.close()
        }, 4000);
  });
    }else{
      const Form=new FormData()
    Form.append('title',title)
    Form.append('body',text)
    Form.append('image',formFile)
  axios.put('https://tarmeezacademy.com/api/v1/posts',Form,{
    headers:header 
}) 
  .then(function (response) {
    document.querySelector('#alerts').innerHTML +='<div id="sucsspost" style="position: fixed; z-index: 99999; width: 30%; right: 0;top: 91%; "></div>'
    console.log(response)
    let model=document.querySelector('#create-model');
    const modelInstance=bootstrap.Modal.getInstance(model);
     const alertPlaceholder = document.getElementById('sucsspost')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }

    modelInstance.hide()
    document.querySelector('#Registre').style.visibility="hidden"
    document.querySelector('#Login').style.visibility="hidden"
    document.querySelector('#logout').style.display="block"
      const alertToHide=bootstrap.Alert.getOrCreateInstance('#sucsspost')
      appendAlert('Nice, your post been created', 'success')
        setTimeout(() => {
          alertToHide.close()
        }, 2000);   
    
  })
  .catch(function (error) {
    // console.log(error)
    document.querySelector('#alerts').innerHTML +='<div id="create" style="position: fixed; z-index: 99999; width: 30%; right: 0;top: 91%; "></div>'
    const alertPlaceholder = document.getElementById('create')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
      
    }
    
      appendAlert(error.response.data.message, 'danger')

  
      const alertToHide=bootstrap.Alert.getOrCreateInstance('#create')
        setTimeout(() => {
          alertToHide.close()
        }, 4000);
  });
      }
    }
    

// }
function log(){
  document.querySelector('#logout').style.display="none"
  document.querySelector('#Registre').style.visibility="visible"
  document.querySelector('#Login').style.visibility="visible"  
  document.querySelector('#profil').innerHTML ="";
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  document.querySelector('#alerts').innerHTML +='<div id="danger" style="position: fixed; z-index: 99999; width: 30%; right: 0;top: 91%; "></div>'
  const alertPlaceholder = document.getElementById('danger')
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
    
  }
  
    appendAlert('Nice, you Logout is successful', 'danger')


    const alertToHide=bootstrap.Alert.getOrCreateInstance('#danger')
      setTimeout(() => {
        alertToHide.close()
      }, 2000);

}
  
  

 

function chek(){
  if(localStorage.getItem('token') && localStorage.getItem('user')){
    document.querySelector('#Registre').style.visibility="hidden"
    document.querySelector('#Login').style.visibility="hidden"
    document.querySelector('#logout').style.display="block"
    
  }

}
chek()
function editPostBtnClicked(postobj){
  let post=JSON.parse(decodeURIComponent(postobj))
  // console.log(post)
  document.querySelector('#post-id-input').value=post.id
  document.querySelector('#title-post-name').value =post.title
  document.querySelector('#Body-post-name').value =post.body
  document.querySelector('#post-title').textContent='Edit a post'
  document.querySelector('#createp').textContent="Edit"
  let modelpost=new bootstrap.Modal(document.getElementById('create-model'))
  modelpost.toggle()
  //   var token=localStorage.getItem('token')
  //   const header={
  //     "authorization":`Bearer ${token}`
  //   }
  // axios.put(`https://tarmeezacademy.com/api/v1/posts/${id}`,
  // {
  //   "body": document.querySelector('#title-post-name').value
  // },
  // {
  //   headers:header
  // }
  // )
  // .then((response)=>{
  //   console.log(response)
  // })
  // .catch((error)=>{
  //   console.log(error)
  // })
}
document.querySelector('#createp').onclick=function(){
  let postid=document.querySelector('#post-id-input').value
  let iscreate= postid ==null || postid==''
  alert(iscreate)
      var token=localStorage.getItem('token')
    const header={
      "authorization":`Bearer ${token}`
    }
    let title=document.querySelector('#title-post-name').value;
    let text=document.querySelector('#Body-post-name').value;
    const formFile=document.querySelector('#image-post-name').files[0];
    const Form=new FormData()
    Form.append('title',title)
    Form.append('body',text)
    Form.append('image',formFile)
  axios.put(`https://tarmeezacademy.com/api/v1/posts/${postid}`,Form,
  {
    headers:header
  }
  )
  .then((response)=>{
    console.log(response)
  })
  .catch((error)=>{
    console.log(error)
  })
}