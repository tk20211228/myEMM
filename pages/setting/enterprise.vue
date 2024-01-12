<template>
  <div>
    enterprise-create
    <div></div>
    <v-btn @click="getToken()">JWDtoken取得
    </v-btn>
    <div></div>
    <li v-for="(item,index) in JWDToken"
    :key="index"
    >
    {{index}}  :  {{item}}
    </li>
    <div></div>
    <v-btn @click="getAccessToken()">アクセストークン取得</v-btn>
    <div></div>
    <li v-for="(item,index) in accessItems"
    :key="index"
    >
    {{index}}  :  {{item}}
    </li>
    <div></div>
    <v-btn @click="createSignupUrl()">エンタープライズ作成</v-btn>
    <div></div>
    <li v-for="(item,index) in signupItems"
    :key="index"
    >
    {{index}}  :  {{item}}
    </li>
  </div>
</template>

<script>
const PROJECT_ID = 'testapp-emm'

const jwd = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpZC0wMjItMDExNS0wMTIxQHRlc3RhcHAtZW1tLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic2NvcGUiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2FuZHJvaWRtYW5hZ2VtZW50IiwiYXVkIjoiaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4iLCJleHAiOjE2NzM3NTcwMTAsImlhdCI6MTY3Mzc1NDAxMH0.ZthD4vKkLANKiv5XEmj9IprFVlraNQvjqSlk4nGVO2-2BaYPBLpTM2O6xfzmLPQqsd4PFeA1B8MXns5fK3qSGzT8f9qVc80GmibPn9h92231KizeUU2TM9t7xHOTB9TQLMee6nW_yI01rOetd19MS_8waS-kdUwQxYnwy6WPUWeFy0RNZr6bTsiHIDxad5knyMJHHHH7ke3KnG-fdHKrVLHeCtnr9859XcOkfBYEe4NHALXY_Orr2wUxympbjYBdkvFeAMNuEyOFiF4XXRCoTSLO65Gd6cXpAiK5TfN3z_wlWzjHd7z62I8cvSlESvUwfod5TLNda0g3qom0PojVNw"

const accessToken = "ya29.c.b0AT7lpjAY-kz0rBcECdPZlFCGp-NxxoO0J8f2I5W4-KCesXt8wsTorxAn_H5O9hURZM1IKn7KUHO4oPZnanmxuJFWamtOVZyabK4NcjxeKdMbIMHaMJiTMoADqSxlnbMPCU7qxIueZJHPOQ6c4cn5PDIqbbh5xRUb4eySO_TiR00KEvHcIJ18-SYvjeoTEebt0SHbFdQ4WaqAPSMY9u_6r6x2Ndcd0e4"



const STORAGE_KEY_ACCESS = 'access_token'
const STORAGE_KEY_SIGNUP = 'signup_token'
const STORAGE_KEY_ENTERPRISE = 'enterprise_token'

export default {
  data(){
    return{
      JWDToken:{JWD: jwd},
      accessItems:{access_token: accessToken},
      signupItems:[],
    }
  },
  created (){
    if(this.$route.query.enterpriseToken){
      const parsed = JSON.stringify(this.$route.query);
      localStorage.setItem(STORAGE_KEY_ENTERPRISE,parsed)
    }

    this.accessItems = JSON.parse(localStorage.getItem(STORAGE_KEY_ACCESS))
    this.signupItems = JSON.parse(localStorage.getItem(STORAGE_KEY_SIGNUP))
    this.enterpriseItems = JSON.parse(localStorage.getItem(STORAGE_KEY_ENTERPRISE))
  },
  methods:{
    async getToken(){
      const response = await fetch("http://localhost:5000/post/getjwt")
      .then((res)=>res.json())
      this.JWDToken = {JWD: response}
    },
    async getAccessToken(){
      const requestUrl = "https://oauth2.googleapis.com/token"
      const params = {
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: this.JWDToken.JWD,
      }
      const queryParams = new URLSearchParams(params)
      const response =await fetch( requestUrl ,
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: queryParams
      })
      .then((res)=>res.json())
      this.accessItems = response
      const parsed = JSON.stringify(response);
      localStorage.setItem(STORAGE_KEY_ACCESS,parsed)
    },
    async createSignupUrl(){
      const requestUrl = 'https://androidmanagement.googleapis.com/v1/signupUrls'
      const params = {
        projectId: PROJECT_ID,
        callbackUrl:'https://script.google.com/macros/s/AKfycbw8Bkdzc4nkoYUE6Wa0pdlej0YVBeMqeC5KVdNg1rBmYZqQfC22A69RIqB5VdkZe2Oy-A/exec',// Localhost t2uboki
      }
      // const queryParams = new URLSearchParams(params)
      const response =await fetch( requestUrl ,
      {
        method:'POST',
        headers: {
          'Authorization': `Bearer ${this.accessItems.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
      .then(response => response.json())
      this.signupItems = response
      const parsed = JSON.stringify(response)
      localStorage.setItem(STORAGE_KEY_SIGNUP,parsed)
      // console.log(response)
      window.open(response.url)
    },
  }

}
</script>

<style>

</style>
