# tempConversion
Temperature Conversion App

Math:
- Kelvin and Rankine are absolute scales that start at 0 and go up, they cannot be negative
- Celsius and Fahrenheit are relative scales to the freezing and boiling points of water. They do
  have negative values, and they do have minimum values below which are not physically possible.
  Water freezes at 0 degrees on both scales, but boils at 100 degrees C and 212 degrees fahrenheit.
- The size of a Kelvin and a Celcius degree are the same
- The size of a Rankine and a Fahrenheit degree are the same

The first pushes were initial client and server setup. The basic forms need to be built, and that
is also an opportunity to think through the problem solving technique that will be implemented.

Some data validation will occur on the client side, but only enough to ensure that the appropriate
anount of data is sent to the server. The user is prohibited on the client side from converting from
a temperature to that same temperature scale (cannot convert from celcius to celcius).
The rest of the validation will occur on the server side.

A good bit of time was spent sorting out the complicated database object for each student before
the actual temperature conversion portion was worked on. Once adding to all of the pieces of the complicated
student object were in place the temperature conversion portion was fairly straightforward.