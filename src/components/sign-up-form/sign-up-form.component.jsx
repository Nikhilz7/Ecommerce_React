import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from './sign-up-form.styles';

const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormField] = useState(defaultformFields);
    const { displayName, email, password, confirmPassword} = formFields;
    

    const resertFormFields = () => {
        setFormField(defaultformFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password!==confirmPassword){
            alert("passwords do not match");
            return;
        }
        try{
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            
            await createUserDocumentFromAuth(user,{ displayName });
            resertFormFields();

        }catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert("Email already in use");
            }else{
                console.log('user creation encountered an error: ',err);

            }
        }
    }

    const handleChange = (event) => {
        const { name,value } = event.target;
        setFormField({...formFields, [name]: value})
    };

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                    required
                />

                <FormInput 
                    label="Email"
                    type='email' 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                    required
                />
                
                <FormInput 
                    label="Password" 
                    type='password' 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                    required
                />
                
                <FormInput 
                    label="Confirm Password" 
                    type='password' 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    required
                />
                <Button childern="Sign Up" type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>

    );
};
export default SignUpForm;
