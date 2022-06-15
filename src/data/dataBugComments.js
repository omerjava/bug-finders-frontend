export const comments = [
    {
        comment_id: 1,
        comment: "Did you check button type? If your button type is submit, it doesn't work. It should have 'click' type",
        user_id:7,
        bug_id: 2,
        created_on: "12-11-2021"
    },
    {
        comment_id: 2,
        comment: "What is your event listener? If you use submit event in listener, you should add listener to form, not to button",      
        user_id:7,
        bug_id: 3,
        created_on: "12-12-2021"
    },
    {
        comment_id: 3,
        comment: "If you add 'click' event to form, it can cause error. You should use submit event to add listener to form or add your listener to button with 'click' event",
        user_id:10,
        bug_id: 2,
        created_on: "02-01-2022"
    },
    {
        comment_id: 4,
        comment: "Can you share with us your code?",
        user_id:1,
        bug_id: 5,
        created_on: "02-02-2022"
    },
    {
        comment_id: 5,
        comment: "If you use submit event in addEventListener, you should add listener to form, not to button",
        user_id:11,
        bug_id: 1,
        created_on: "03-01-2022"
    },
    {
        comment_id: 6,
        comment: "If your button type is 'submit', you should add listener to form not to button",
        user_id:11,
        bug_id: 9,
        created_on: "05-01-2022"
    },
    {
        comment_id: 7,
        comment: "Check conditions inside brackets ()",
        user_id:10,
        bug_id: 5,
        created_on: "07-01-2022"
    },
    {
        comment_id: 8,
        comment: "Can you elaborate exact problem when you try to deploy?",
        user_id:11,
        bug_id: 8,
        created_on: "09-01-2022"
    },
    {
        comment_id: 9,
        comment: "user is reserve word in postgresql, that's why you cant use it for example as a table name. Give name as 'users' ",
        user_id:11,
        bug_id: 7,
        created_on: "12-01-2022"
    },
];