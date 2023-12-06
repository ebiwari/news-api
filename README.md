<h2>Step 1- run npm install </h2>

<h2>Register News User(Post Request)</h2>
<p>
    localhost:${port}/auth/register: Register new User
    <br>
    <blockquote>{
        name:
        email:
        password
    }</blockquote>
<p>

<h2>Login(Post Request)</h2>
<p>
    localhost:${port}/auth/register: login user and receive a auth token
    <br>
    <blockquote>{      
        email:'',
        password:''
    }
    </blockquote>
</p>

<h2>Get User Preference(GET Request)</h2>
<p>
    localhost:${port}/api/preferences: Get all news by preference
<p>

<h2>Update User Preference(PUT Request)</h2>
<p>
    localhost:${port}/api/preferences: update the user
       <br>
    <blockquote>{
        "keyword":"Ahmed tunubu",
        "articlesPage":1,
        "articlesCount":20
        }
    </blockquote>

<p>

<h2>Get All news by preference()</h2>
<p>
    localhost:${port}/api/news: Get all news by preference
    <blockquote>user is expected to have login</blockquote>

<p>
