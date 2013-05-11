(function() {

  var audio = document.getElementsByTagName('audio')[0];

  
  var context = new webkitAudioContext(),
    // Create a biquad filter node for the bass
    bass = context.createBiquadFilter(),
    treble = context.createBiquadFilter();


  // Set up the biquad filter node with a low-pass filter type
  bass.type = 3;
  bass.frequency.value = 440;
  bass.Q.value = 0;
  bass.gain.value = 0;
  
  treble.type = 4;
  treble.frequency.value = 1700;
  treble.Q.value = 0;
  treble.gain.value = 0;
  
  // Wait for window.onload to fire. See crbug.com/112368
  window.addEventListener('load', function(e) {
    // Our <audio> element will be the audio source.
    var source = context.createMediaElementSource(audio);

    // Connect the source to the bass biquad filter node
    source.connect(bass);

    // Connect the bass biquad filter node to the treble node
    bass.connect(treble);

    treble.connect(context.destination);

    document.getElementById('bass').addEventListener('click',function(e){
      var step = parseFloat(e.target.title);
      bass.gain.value+=step;
      console.log('bass.gain.value',bass.gain.value);
    });
    
    document.getElementById('treble').addEventListener('click',function(e){
      var step = parseFloat(e.target.title);
      treble.gain.value+=step;
      console.log('treble.gain.value',treble.gain.value);
    });
    


  }, false);


})();
