import pool from '../../db_connection'

// crud  users crud
function createUser (
  newUserName,
  newUserEmail,
  newUserPassword,
  newUserTelphone
) {
  let sql =
    'insert into users  (username,email,password,telephone) values (?,?,?,? ) '

  pool.query(
    sql,
    [newUserName, newUserEmail, newUserPassword, newUserTelphone],
    (error, result) => {
      if (error) console.error('erro   in creatinngthe user')
      else console.log('user created successfully')
    }
  )
}

// create

// update

// get  userby id

// list  of the user

// delete
