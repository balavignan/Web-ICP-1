package com.example.praga.myapplication;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import java.util.Locale;
public class Display extends Activity {
    TextToSpeech ttobject;
    int result;
    EditText et;
    String text;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.display);
        String username = getIntent().getStringExtra("Username");
       TextView tv = (TextView) findViewById(R.id.textView3);
        tv.setText(username);
        et= (EditText)findViewById(R.id.editText);


    }
    public void onC(View v) {
        Intent redirect = new Intent(Display.this, loginActivity.class);
        startActivity(redirect);
    }

    public void doSomething(View v) {



    }
    protected void onDestroy()
    {

        super.onDestroy();
        ttobject.stop();
        ttobject.shutdown();
    }
}
