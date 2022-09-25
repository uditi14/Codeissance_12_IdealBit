// Accordion
function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " w3-theme-d1";
    } else { 
      x.className = x.className.replace("w3-show", "");
      x.previousElementSibling.className = 
      x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
  }
  
  // Used to toggle the menu on smaller screens when clicking on the menu button
  function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }
  
  
  let currentNo = 3
  let prevContent = ` `
  let commentsObj = [
      {
          id:"1",
          comments:[ 'oh wow!','nice!','great health tips!!']
      },
      {
          id:"2",
          comments:[ "love your diet ^^","very good",'Unbelieveable!!']
      },
    //   {
        //   id:"3",
        //   comments:[ "aaaaa","asasss",'nucububc']
    //   }
  ]
      
  
  
  function post () {
      // const text = document.getElementById('post-text').value
      // const 
      const text = document.getElementById('post-text').value
      const postSpace = document.getElementById('post')
      currentNo +=1
  
      commentsObj.push({
          id:String(currentNo),
          comments:[]
      })
  
      let content = `      
      <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
      <img src="https://image.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:70px;height:70;">
      <span class="w3-right w3-opacity">1 min</span>
      <h4>Yash</h4><br>
      <hr class="w3-clear">
      <p>${text}</p>
        
      <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>  Like</button> 
      <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"  onclick="showComment(${currentNo})"><i class="fa fa-comment"></i>  Comment</button> 
      <span id="${currentNo}"> </span>
    </div>`+prevContent
  
    prevContent = content
  
    postSpace.innerHTML = content
  
  
      document.getElementById('post-text').value = ""
  
  }
  let shown = false
  
  function showComment (id) {
      if (shown) {
          shown = false
          document.getElementById(id).style.display = "none"
      }
      else {
          shown = true
          document.getElementById(id).style.display = "grid"
      const commentBox = document.getElementById(id)
      // commentBox.innerHTML = ' '
      let commhtml =``
  
      commentsObj.forEach(obj => {
          // console.log(obj.id,id);
          if (obj.id == id) {
              console.log("hhh");
              obj.comments.forEach(comment=>{
                  commhtml += `<div>${comment}</div>`
              })
  
              commentBox.innerHTML =  `
              <div>
              <input type="text" id=${id+id}>
              <button id=${id+id+id} onclick="postComment(${id+id},${id})">post</button>
              </div> ${commhtml}`
              // commithtml =``
              // return
          }
          
  
      })}
  }
  
  function postComment (id1,id) {
      commentsObj.forEach(obj => {
          if (obj.id == id) {
              console.log(document.getElementById(id1).value);
  
              obj.comments.push(document.getElementById(id1).value)
              console.log(obj.comments);
              midPost(id)
          }
      })
  }
  
  function midPost (id) {
      const commentBox = document.getElementById(id)
      // commentBox.innerHTML = ' '
      let commhtml =``
  
      commentsObj.forEach(obj => {
          // console.log(obj.id,id);
          if (obj.id == id) {
              console.log("hhh");
              obj.comments.forEach(comment=>{
                  commhtml += `<div style={background-color: lightgray; border-radius: 12px;}>${comment}</div>`
              })
  
              commentBox.innerHTML =  `
              <div>
              <input type="text" id=${id+id}>
              <button id=${id+id+id} onclick="postComment(${id+id},${id})">post</button>
              </div> ${commhtml}`
              // commithtml =``
              // return
          }
          
  
      })
  }
  