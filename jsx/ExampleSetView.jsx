<div className="ExampleSetView">
  <div className="derp">{derp}</div>
  <div className="herp">{herp}</div>
  { leftExample ?
      <div className="ExampleView left"
                   countdown={leftExample.countdown}
                   foobar={leftExample.foobar}></div>
  : <div></div> }
  { middleExample ?
    <div className="ExampleView middle"
               countdown={middleExample.countdown}
               foobar={middleExample.foobar}></div>
  : <div></div> }
  { rightExample ?
    <div className="ExampleView right"
               countdown={rightExample.countdown}
               foobar={rightExample.foobar}></div>
  : <div></div> }
</div>
