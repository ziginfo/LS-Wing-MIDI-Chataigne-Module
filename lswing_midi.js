/*
This script is for the General-MIDI CC-Mode
While pressing and holding down the SET MARKER and CYCLE buttons
Connect the USB cable from your computer to the nanoKONTROL2 and engage CC mode.
 */    
function init() {

		
//Channel Fader  Container
	
	faders = local.values.addContainer("Faders");
	faders.setCollapsed(true);
		for (var i = 1; i<=10; i++) {
		n= i+61 ;
		faders.addFloatParameter("Fader "+(i), "", 0, 0, 127);  }	
	
/*
//Buttons Containers
	buttcont = local.values.addContainer("Buttons");
	buttcont.setCollapsed(true);
	*/

//Buttons Containers			
	buttons = local.values.buttons.addContainer("Buttons Row1");
	buttons.setCollapsed(true);
		for (var i = 1; i<=10; i++) {
		buttons.addBoolParameter("Button "+(i),"",""); }
		
	buttons = local.values.buttons.addContainer("Buttons Row2");
	buttons.setCollapsed(true);
		for (var i = 11; i<=20; i++) {
		buttons.addBoolParameter("Button "+(i), "","");  }
		
	buttons = local.values.buttons.addContainer("Buttons Row3");
	buttons.setCollapsed(true);
		buttons.addTrigger("Reset","");
		for (var i = 21; i<=30; i++) {
		buttons.addBoolParameter("Button "+(i), "","");  }
		
	buttons = local.values.buttons.addContainer("Buttons Row4");
	buttons.setCollapsed(true);
		for (var i = 31; i<=40; i++) {
		buttons.addBoolParameter("Button "+(i), "","");  }
		
	buttons = local.values.buttons.addContainer("Buttons Row5");
	buttons.setCollapsed(true);
		for (var i = 41; i<=50; i++) {
		buttons.addBoolParameter("Button "+(i), "","");  }
		
	buttons = local.values.buttons.addContainer("Buttons Row6");
	buttons.setCollapsed(true);
		for (var i = 51; i<=60; i++) {
		buttons.addBoolParameter("Button "+(i), "","");  }
		
		
}		

//Request MIDI Control Change message
//Faders 
function ccEvent(channel, number, value)
{             
         if(number >= 62 && number <= 71){
  			var i= number-61;
			local.values.faders.getChild('Fader'+i).set(value);    }
//Buttons row3  			
		 if(number >= 31 && number <= 40){
  			var i= number-10;
			local.values.buttons.buttonsRow3.getChild("Button"+i).set(value); }
 }
 
 function reset(){
 			if(local.values.buttons.buttonsRow3.reset != ""){
 			for (var i = 31; i<=40; i++) {
 			var n= i-10;
			local.values.buttons.buttonsRow3.getChild("Button"+n).set(0);} 	} 
 }
        
//Buttons
function noteOnEvent(channel, pitch, velocity)
{		
		if(pitch >= 1 && pitch <= 10){
		i= pitch;
    	local.values.buttons.buttonsRow1.getChild("Button"+i).set(velocity);}
    	
    	if(pitch >= 11 && pitch <= 20){
		i= pitch;
    	local.values.buttons.buttonsRow2.getChild("Button"+i).set(velocity);}
    	
    	if(pitch >= 41 && pitch <= 50){
		i= pitch-10;
    	local.values.buttons.buttonsRow4.getChild("Button"+i).set(velocity);}
    	
    	if(pitch >= 51 && pitch <= 60){
		i= pitch-10;
    	local.values.buttons.buttonsRow5.getChild("Button"+i).set(velocity);}
    	
    	if(pitch >= 21 && pitch <= 30){
		i= pitch+30;
    	local.values.buttons.buttonsRow6.getChild("Button"+i).set(velocity);}
    	
}

function noteOffEvent(channel, pitch, velocity)
{		
		if(pitch >= 1 && pitch <= 10){
		i= pitch ;
    	local.values.buttons.buttonsRow1.getChild("Button"+i).set(0);}
    	
    	if(pitch >= 11 && pitch <= 20){
		i= pitch ;
    	local.values.buttons.buttonsRow2.getChild("Button"+i).set(0);}
    	
    	if(pitch >= 41 && pitch <= 50){
		i= pitch-10 ;
    	local.values.buttons.buttonsRow4.getChild("Button"+i).set(0);}
    	
    	if(pitch >= 51 && pitch <= 60){
		i= pitch-10 ;
    	local.values.buttons.buttonsRow5.getChild("Button"+i).set(0);}
    	
    	if(pitch >= 21 && pitch <= 30){
		i= pitch+30 ;
    	local.values.buttons.buttonsRow6.getChild("Button"+i).set(0);}
    	
}

function moduleValueChanged(value)  { 
		if(local.values.buttons.buttonsRow3.reset.get)  {
			for (var i = 31; i<=40; i++) {
 			var n= i-10;
			local.values.buttons.buttonsRow3.getChild("Button"+n).set(0);}  }  
}
	
   

//common functions


function send_control(channel, number, value) {
	local.sendCC (channel, number, value);
}

function set_color(row, number, value) {
	var channel = 1 ;
	var number = (row*10) + number ;
	if (row == 3){
		local.sendCC (channel, number, value);}
	else {	
		local.sendNoteOn(channel, number, value);}
}

function send_note(channel, pitch, velocity) {
	local.sendNoteOn(channel, pitch, velocity);
}

function reset_colors() {
	for (no = 1; no<=20; no++) {
	local.sendNoteOff(1, no); }
	for (no = 31; no<=40; no++) {
	local.sendCC (1, no, 0);}
}

