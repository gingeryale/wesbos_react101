import Rebase from 're-base';

const base = Rebase.createClass({
	apiKey: process.env.COTD_API_Key,
    authDomain: "catch-of-the-day-aolin.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-aolin.firebaseio.com",
});

export default base;