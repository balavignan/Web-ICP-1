package com.umkc.lab3;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class RegisterActivity extends AppCompatActivity {
    private FirebaseAuth mAuth;
    private static final String TAG = "RegisterActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        mAuth = FirebaseAuth.getInstance();
    }

    public void register(View view) {
        TextView txtEmail = (TextView) findViewById(R.id.txtUsername);
        String email = txtEmail.getText().toString();
        TextView txtPassword = (TextView) findViewById(R.id.txtPassword);
        String password = txtPassword.getText().toString();

        TextView lblUsernameError = (TextView) findViewById(R.id.lblUsernameError);
        TextView lblPasswordError = (TextView) findViewById(R.id.lblPasswordError);
        //Setting empty string to the error labels.
        lblUsernameError.setText("");
        lblPasswordError.setText("");

        //Checking the username is empty or not.
        if(email.isEmpty())
        {
            lblUsernameError.setText("Please enter the email.");
        }
        //Checking the password is empty or not.
        else if(password.isEmpty())
        {
            lblPasswordError.setText("Please enter password");
        }
        //Validating the username and password.
        else {
            mAuth.createUserWithEmailAndPassword(email, password)
                    .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if (task.isSuccessful()) {
                                // Sign in success, update UI with the signed-in user's information
                                Log.d(TAG, "createUserWithEmail:success");
                                FirebaseUser user = mAuth.getCurrentUser();
                                Intent redirect = new Intent(RegisterActivity.this, LoginActivity.class);
                                startActivity(redirect);
                            } else {
                                // If sign in fails, display a message to the user.
                                Log.w(TAG, "createUserWithEmail:failure", task.getException());
                                lblPasswordError.setText("Registration unsuccessful.");
                            }

                        }
                    });
        }

    }
}
