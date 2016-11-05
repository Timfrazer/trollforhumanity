import test from 'ava'
import db from '../../lib/db'

test('collection', t => {
  t.true( db('test').collection === 'test' )
})

test('crud', t => {

  let d = db('test')
  let time = Date.now()
  let obj = { time }

  // create
  let res = d.create( obj )
  t.truthy( res.id )
  t.true( res.time === time )

  // read
  t.deepEqual( d.find( res.id ), res )

  // update
  let entry = d.find( res.id )
  entry.foo = 'bar'
  d.update( entry )
  t.deepEqual( d.find( res.id ), Object.assign( {}, obj, {foo: 'bar', id: res.id} ) )
  
  // browse
  d.create( {baz: null} )
  t.true( d.all().length === 2 )
  
  // delete
  d.delete( res.id )
  t.true( d.all().length === 1 )
  
})

