/* ToDoList:
-function to call https://api.github.com/users/ API
-function to render the UI
-add event listener to the button
-store latest fetch to local storage
*/
// UI elements as dom itemes
const usernameInput = document.querySelector('#username');
const btn = document.querySelector('#btn');
const profileContainer = document.querySelector('#profile');
const searchForm = document.querySelector('#search-form');

function LoadOfflineData() {
    const Data = {
        "login": "zeiadhabbab",
        "id": 1070930,
        "node_id": "MDQ6VXNlcjEwNzA5MzA=",
        "avatar_url": "https://avatars.githubusercontent.com/u/1070930?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/zeiadhabbab",
        "html_url": "https://github.com/zeiadhabbab",
        "followers_url": "https://api.github.com/users/zeiadhabbab/followers",
        "following_url": "https://api.github.com/users/zeiadhabbab/following{/other_user}",
        "gists_url": "https://api.github.com/users/zeiadhabbab/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/zeiadhabbab/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/zeiadhabbab/subscriptions",
        "organizations_url": "https://api.github.com/users/zeiadhabbab/orgs",
        "repos_url": "https://api.github.com/users/zeiadhabbab/repos",
        "events_url": "https://api.github.com/users/zeiadhabbab/events{/privacy}",
        "received_events_url": "https://api.github.com/users/zeiadhabbab/received_events",
        "type": "User",
        "user_view_type": "public",
        "site_admin": false,
        "name": "Zeyad Habbab",
        "company": null,
        "blog": "https://zeyadmh.com",
        "location": "Palestine",
        "email": null,
        "hireable": true,
        "bio": "With more than 11 years of experience as a Software Developer, I’ve had the opportunity to work with both local and global companies on a wide range of projects",
        "twitter_username": null,
        "public_repos": 39,
        "public_gists": 0,
        "followers": 22,
        "following": 34,
        "created_at": "2011-09-22T12:52:03Z",
        "updated_at": "2025-11-07T19:38:43Z"
    };
    renderUI(Data);
};

function renderUI(data) {
    let html = `
    <img class="avatar" src="${data.avatar_url}" alt="Avatar">
    <h2>${data.name}</h2>
    <p>${data.bio}</p>
    `;

    if (data.location && data.location != "") {
        html += `<p>🌏 Location: ${data.location}</p>`;
    }

    if (data.blog && data.blog != "") {
        html += `<p>🔗 Blog: <a target="_blank" href="${data.blog}">${data.blog}</a></p>`;
    }

    if (data.public_repos) {
        html += `<p>📁 Public Repo: ${data.public_repos}</p>`;
    }

    html += `<p>👥 Followers: ${data.followers} | Following: ${data.following}</p>`;
    html += `<p><a target="_blank" href="${data.html_url}">View Profile on GitHub</a></p>`;

    profileContainer.innerHTML = html;
}

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let username = usernameInput.value.trim();
    if (username) {
        fetchUserData(username);
    }
});

async function fetchUserData(username) {
    profileContainer.innerHTML = '<p>🚶‍♀️ Loading...</p>';

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('User not found: ' + response.status);
        }

        const data = await response.json();
        renderUI(data);

        localStorage.setItem('userData', JSON.stringify(data));

    } catch (error) {
        profileContainer.innerHTML = `<p>❌ Error: ${error.message}</p>`;
    }
}

function LoadIninalData() {
    if (localStorage.getItem('userData')) {
        const data = JSON.parse(localStorage.getItem('userData'));
        renderUI(data);
    }
}

LoadIninalData();
