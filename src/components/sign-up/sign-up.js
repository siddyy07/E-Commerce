import React, { Component } from 'react'

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import {auth, createUserProfileDocument} from '../../components/firebase/firebase.utils';

import './sign-up.styles.scss';


class SgnUp extends Component {
    constructor(){
        super();


        this.state ={
            dispalayName: '',
            email: '',
            password: '',
            confrimPassword: ''
        }
    }

    handlesubmit = async event => {
        event.preventDefault();

        const {dispalayName, email, password, confrimPassword}= this.state

        if(password !== confrimPassword) {
            alert ("password don't match");
            return;
        }
        try{
            const {user} = await auth.createUserWithEmailAndPassword(
                email, 
                password
            );

              await createUserProfileDocument(user, {dispalayName});

             this.setState({
                displayName: '',
                email: '',
                password: '',
                confrimPassword: ''


             });


        } catch (error) {
            console.error(error);

        }


    }

    handleChange = event => {
        const { name, value} = event.target;

        this.setState({[name]: value});
    }
    render() {
        const {displayName, email, password, confrimPassword}= this.state
        return(
            <div className='sign-up'>
                <h2 className='title'> I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit ={this.handlesubmit}>
                    <FormInput
                    type= 'displayName'
                    name='displayName'
                    value={displayName}
                    onChange= {this.handleChange}
                    label='Display Name'
                    required
                    />
                    <FormInput
                    type= 'email'
                    name='email'
                    value={email}
                    onChange= {this.handleChange}
                    label='E-mail'
                    required
                    />
                    <FormInput
                    type= 'password'
                    name='password'
                    value={password}
                    onChange= {this.handleChange}
                    label='Password'
                    required
                    />
                    
                    <FormInput
                    type= 'password'
                    name='confrimPassword'
                    value={confrimPassword}
                    onChange= {this.handleChange}
                    label='Confrim Password'
                    required
                    />
                    <CustomButton type= 'submit'>SIGN UP</CustomButton>
                    


                </form>

            </div>
        )
    }
}
export default SgnUp;