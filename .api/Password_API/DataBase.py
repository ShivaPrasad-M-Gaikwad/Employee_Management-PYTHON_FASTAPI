import pyodbc as odbc

_Driver = 'SQL SERVER'
_Server = r'SHIVAPRASAD\SQLEXPRESS'
_Database = 'College_api'
_ConnectioString = f"""
    DRIVER={{{_Driver}}};SERVER={_Server};DATABASE={_Database};Trust_Connection=yes;
"""

def Read():
    conn = odbc.connect(_ConnectioString)
    Cursor = conn.cursor()
    Cursor.execute('select * from employee_details')

    result = Cursor.fetchall()


    data_dicts: list[dict] = []
    column_names = [col[0] for col in Cursor.description]
    for row_tuple in result:
        data_dict = dict(zip(column_names, row_tuple))
        data_dicts.append(data_dict)

            
    Cursor.close()
    conn.close()

    return data_dicts


def Readbyid(id: int):
    conn = odbc.connect(_ConnectioString)
    Cursor = conn.cursor()
    Cursor.execute(f'select * from employee_details where id = {id}')
    result = Cursor.fetchall()

    if result:
        column_names = [col[0] for col in Cursor.description]
        for row_tuple in result:
            data_dict = dict(zip(column_names, row_tuple))
            return [data_dict]
    else:
        return {'Error' : "DATA NOT AVAILABLE IN THE DATABASE "}
    Cursor.close()
    conn.close()

def Updatebyid(id: int, Names:str , job: str, salary: int):
    conn = odbc.connect(_ConnectioString)
    Cursor = conn.cursor()
    Cursor.execute(f"update employee_details set Names = '{Names}', job='{job}', salary={salary} where id={id}")
    Cursor.commit()
    Cursor.close()
    conn.close()

def Createbyid(Names:str , job: str, salary: int):
    conn = odbc.connect(_ConnectioString)
    Cursor = conn.cursor()
    Cursor.execute(f"INSERT INTO employee_details VALUES ('{Names}', '{job}', {salary});")
    Cursor.commit()
    Cursor.close()
    conn.close()
    print("created")

def Deletebyid(id: int):
    conn = odbc.connect(_ConnectioString)
    Cursor = conn.cursor()
    Cursor.execute(f"delete from employee_details where id = {id}")
    Cursor.commit()
    Cursor.close()
    conn.close()
    print("Deleted")

if __name__ == '__main__':
    print( Readbyid(1))