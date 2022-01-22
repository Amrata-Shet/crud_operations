//Create a function to Get the User data
async function getUsers() {
    let users;
    try {
      const data = await fetch(
        "https://61ceff9f65c32600170c7e71.mockapi.io/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      users = await data.json();
      console.log(users);
    } catch (err) {
      console.log(err);
    }
    return users;
  }
  // getUsers();
  
  //create a function to display the data
  async function displayUsers() {
    let users = await getUsers();
    console.log(users);
  
    const userList = document.querySelector(".user-list");
    userList.innerHTML = "";
    users.forEach((user) => {
      // console.log(user.name);\
      userList.innerHTML += `
      <div class="user-container">
      <img class="user-avatar" src="${user.avatar}" alt="img">
      <div>
      <h2 class="user-name">${user.name}</h2>
      <button onclick="deleteUsers(${user.id})">Delete</button>
      <button onclick="editUser(${user.id});deleteUsers(${user.id})">Edit</button>
      </div>
      </div>`;
    });
  }
  
  displayUsers();
  
function reset(){
  document.querySelector(".add-user-name").value='';
  document.querySelector(".add-user-avatar").value='';
}


  //create a function to delete the user
  async function deleteUsers(id) {
    try {
      const data = await fetch(
        `https://61ceff9f65c32600170c7e71.mockapi.io/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const users = await data.json();
      console.log(users);
      displayUsers();
    } catch (err) {
      console.log(err);
    }
  }
  
 // deleteUsers();
  
async function update_data(id){
  const url=await fetch(
    `https://61ceff9f65c32600170c7e71.mockapi.io/users/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const update_data=await url.json();
  document.querySelector(".add-user-name").value=update_data.name;
  document.querySelector(".add-user-avatar").value=update_data.avatar;
}


async function editUser(id){
    try { 
        const data = await fetch(
          `https://61ceff9f65c32600170c7e71.mockapi.io/users/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(update_data(`${id}`)),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const users = await data.json();
        console.log(users);
        
        displayUsers();
      } catch (err) {
        console.log(err);
      }
}


//editUser();

  //Add user
  async function addUser() {
    const userName = document.querySelector(".add-user-name").value;
    const userAvatar = document.querySelector(".add-user-avatar").value;
    //   console.log(userName, userAvatar);
    const data = await fetch(
      "https://61ceff9f65c32600170c7e71.mockapi.io/users",
      {
        method: "POST",
        body: JSON.stringify({
          name: userName,
          avatar: userAvatar,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    displayUsers();
    reset();
  }
  
  //addUser();