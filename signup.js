SIGNUP PAGE


using System;
using System.Collections.Generic; using System.Linq;
using System.Web; using System.Web.UI;
using System.Web.UI.WebControls; using System.Data;
using System.Data.SqlClient; using System.Configuration;


public partial class user_signup : System.Web.UI.Page
{
protected void Page_Load(object sender, EventArgs e)
{

}

protected void btn_login_Click(object sender, EventArgs e)
{
if (isformvalid())
{
using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["framertrader"].ConnectionStri ng))
{
con.Open();
SqlCommand cmd = new SqlCommand("Insert into
tbl_signup(username,password,email,usertype) values ('" + txtuser.Text + "','" + txtpass.Text + "','" + txtemail.Text + "', 'user')", con);
cmd.ExecuteNonQuery();
Response.Write("<script> alert('registration successfully done'); </script>"); clr();
con.Close();
lbl_warning.Text = "registration successfully done"; lbl_warning.ForeColor = System.Drawing.Color.Green;

}
}
else
{
Response.Write("<script> alert ('registration failed'); </script>"); lbl_warning.Text = "registration successfully done"; lbl_warning.ForeColor = System.Drawing.Color.Red;
}
}
 
private bool isformvalid()
{
if (txtuser.Text == "")
{
Response.Write("<script> alert ('user name not vaild'); </script> "); return false;
}
else if (txtemail.Text == "")
{
Response.Write("<script> alert ('user email not vaild'); </script> "); return false;
}
else if(txtpass .Text =="")
{
Response.Write("<script> alert ('user pasword not vaild'); </script> "); return false;
}
else if (txtpass.Text != txtconpass .Text)
{
Response.Write("<script> alert ('user confirm password not vaild'); </script> "); return false;
}
return true;
}

private void clr()
{
txtuser.Text = string.Empty; txtemail.Text = string.Empty; txtpass.Text = string.Empty; txtconpass.Text = string.Empty;
}
}

