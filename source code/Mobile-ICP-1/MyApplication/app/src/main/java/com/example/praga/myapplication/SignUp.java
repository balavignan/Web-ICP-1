package com.example.praga.myapplication;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
public class SignUp extends AppCompatActivity{
    TextView errorText;
    String userName;
    String password;
    String confirmPassword;

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        return super.onOptionsItemSelected(item);
    }

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.signup);
    }

    public void login(View v)
    {
        Intent loginPage = new Intent(SignUp.this,loginActivity.class);
        startActivity(loginPage);
    }

    public boolean validate() {
        boolean valid = true;

        if (userName.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(userName).matches()) {
            Toast.makeText(getApplicationContext(), "Enter a valid email address", Toast.LENGTH_SHORT).show();
            valid = false;
        } else {
            errorText.setError(null);
        }

        if (password.isEmpty() || password.length() < 4 || password.length() > 10) {
            Toast.makeText(getApplicationContext(), "Password should be atleast 4-6 alphanumeric", Toast.LENGTH_SHORT).show();
            valid = false;
        } else {
            errorText.setError(null);
        }
        if (confirmPassword.isEmpty() || confirmPassword.length() < 4 || confirmPassword.length() > 10) {
            Toast.makeText(getApplicationContext(), "Password should be atleast 4-6 alphanumeric", Toast.LENGTH_SHORT).show();
            valid = false;
        } else {
            errorText.setError(null);
        }

        if(!password.equals(confirmPassword)){
            valid=false;
            Toast.makeText(getApplicationContext(), "Passwords do not match", Toast.LENGTH_SHORT).show();
        }
        else {
            errorText.setError(null);
        }

        return valid;
    }
    public void newUser(View v){

        EditText usernameCtrl = (EditText) findViewById(R.id.username);
        EditText passwordCtrl = (EditText) findViewById(R.id.password);
        EditText confirmPasswordCtrl = (EditText) findViewById(R.id.CFpassword);

        userName = usernameCtrl.getText().toString();
        password = passwordCtrl.getText().toString();
        confirmPassword = confirmPasswordCtrl.getText().toString();

        if (validate()) {
            Intent goTonextPage = new Intent(SignUp.this,Display.class);
            startActivity(goTonextPage);
        }
    }
}
