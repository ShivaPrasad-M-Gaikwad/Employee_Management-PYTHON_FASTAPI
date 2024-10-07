import string
import secrets as cryp


def generatepass(size):
    alpha_numerical = string.ascii_letters + string.digits
    password = ''.join(cryp.choice(alpha_numerical)for _ in range(0,size)) 
    return password
