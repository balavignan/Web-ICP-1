package com.example.praga.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;

import android.view.View;
import android.widget.EditText;
import android.widget.TextView;



public class loginActivity extends AppCompatActivity {

    TextView txtstatus;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_login);
    }

    public void checkCredentials(View v)
    {
        EditText usernameCtrl = (EditText)findViewById(R.id.TFusername);
        EditText passwordCtrl = (EditText) findViewById(R.id.TFpassword);
        TextView errorText = (TextView)findViewById(R.id.lbl_Error);
        String userName = usernameCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();

        boolean validationFlag = false;
        //Verify if the username and password are not empty.
        if(!userName.isEmpty() && !password.isEmpty()) {
            if(userName.equals("Admin") && password.equals("admin")) {
                validationFlag = true;

            }
        }
        if(!validationFlag)
        {
            errorText.setVisibility(View.VISIBLE);
        }
        else
        {
            //This code redirects the from login page to the home page.
            Intent nextpage = new Intent(loginActivity.this, Display.class);
            nextpage.putExtra("Username",userName);

            startActivity(nextpage);
        }

    }
    public void SignUp(View v)
    {
        Intent redirect = new Intent(loginActivity.this,SignUp.class);
        startActivity(redirect);
    }

    @Override
    protected void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

    }
}
