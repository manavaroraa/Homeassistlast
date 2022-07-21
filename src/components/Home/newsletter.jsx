
import React, { Component } from 'react';
// import the component
import Mailchimp from 'react-mailchimp-form'
 
class App extends Component {
  render() {
    return (
        <Mailchimp
        action='https://gmail.us9.list-manage.com/subscribe/post?u=114b5e8ab97748593ea4f871d&amp;id=ec8b3f992f'
        fields={[
          {
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true
          }
        ]}
        />
    );
  }
}
 
export default App;