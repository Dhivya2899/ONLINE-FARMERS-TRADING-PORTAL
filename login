LOGIN

using System;
using System.Collections.Generic; using System.Linq;
using System.Web; using System.Web.UI;
using System.Web.UI.WebControls; using System.Data.SqlClient;
using System.Data;
using System.Configuration;

public partial class user_login : System.Web.UI.Page
{
protected void Page_Load(object sender, EventArgs e)
{
if(!IsPostBack)
{

if(Request.Cookies["email"] !=null && Request.Cookies["password"] != null )
{
txt_email.Text = Request.Cookies["email"].Value; txt_pass.Text = Request.Cookies["password"].Value; CheckBox1.Checked = true;

}
}

}

protected void btn_login_Click(object sender, EventArgs e)
{
using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["framertrader"].ConnectionStri ng))
{
con.Open();
SqlCommand cmd = new SqlCommand("select * from tbl_signup where
email=@email and password=@password ", con); cmd.Parameters.AddWithValue("@email", txt_email.Text);
cmd.Parameters.AddWithValue("@password", txt_pass.Text); cmd.ExecuteNonQuery();
SqlDataAdapter sda = new SqlDataAdapter(cmd); DataTable dt = new DataTable();
sda.Fill(dt);
if (dt.Rows.Count != 0)
 
{

if(CheckBox1.Checked)
{

Response.Cookies["email"].Value = txt_email.Text; Response.Cookies["password"].Value = txt_pass.Text;

Response.Cookies["email"].Expires = DateTime.Now.AddDays(2); Response.Cookies["password"].Expires = DateTime.Now.AddDays(2);

}

else
{
Response.Cookies["email"].Expires = DateTime.Now.AddDays(-1); Response.Cookies["password"].Expires = DateTime.Now.AddDays(-1);
}


string utype;
utype = dt.Rows[0][4].ToString().Trim();

if(utype == "user")
{
Session["email"] = txt_email.Text; Response.Redirect("~/user/userhome.aspx");

}
if(utype =="admin")
{
 


}

}
else
{
 
Session["email"] = txt_email.Text; Response.Redirect("~/admin/AdminHome.aspx");
 
lblerror.Text = "invalid email and password";
}


//Response.Write("<script> alert('registration successfully done'); </script>"); clr();
con.Close();
// lbl_warning.Text = "registration successfully done";
// lbl_warning.ForeColor = System.Drawing.Color.Green;

}
}
 
private void clr()
{
txt_email.Text = string.Empty; txt_pass.Text = string.Empty;
}
}
