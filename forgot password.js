FORGOT PASSWORD

using System;
using System.Collections.Generic; using System.Linq;
using System.Web; using System.Web.UI;
using System.Web.UI.WebControls; using System.Data;
using System.Data.SqlClient; using System.Configuration; using System.Net.Mail; using System.Net;



public partial class user_forgot_password : System.Web.UI.Page
{
protected void Page_Load(object sender, EventArgs e)
{

}

protected void btn_login_Click(object sender, EventArgs e)
{
using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["framertrader"].ConnectionStri ng))
{
con.Open();
SqlCommand cmd = new SqlCommand("select * from tbl_signup where
email=@email", con);
cmd.Parameters.AddWithValue("@email", txt_email.Text); SqlDataAdapter sda = new SqlDataAdapter(cmd); DataTable dt = new DataTable();
sda.Fill(dt);

if(dt.Rows.Count !=0)
{
string myGUID = Guid.NewGuid().ToString(); int uid = Convert.ToInt32(dt.Rows[0][0]);
 
SqlCommand cmd1 = new SqlCommand("Insert into Forgotpass(id, uid, RequestDateTime) values ('" + myGUID + " ', '" + uid + " ', GETDATE() ) ", con);
cmd1.ExecuteNonQuery();

// send reset link //

string ToEmailAddress = dt.Rows[0][3].ToString(); string username = dt.Rows[0][1].ToString();
string EmailBody = "Hi , "+username + " <br/><br/> Click the link below to reset your password<br/> http://localhost:11829/user/RecoveryPassword.aspx?id="+myGUID;
MailMessage PassRecMail = new MailMessage(" gururam349@gmail.com", ToEmailAddress);
PassRecMail.Body = EmailBody; PassRecMail.IsBodyHtml = true; PassRecMail.Subject = "reset password";
SmtpClient SMTP = new SmtpClient(" smtp.gmail.com", 587); SMTP.Credentials = new NetworkCredential()
{
UserName = "dhivya349@gmail.com", Password = "dhivya349"

};
SMTP.EnableSsl = true; SMTP.Send(PassRecMail);

//end send reset link //

lblerror.Text = "reset link send ! Check your email for reset password ..."; lblerror.ForeColor = System.Drawing.Color.Green;

}
else
{
lblerror.Text = "OOPS! This Email does not exist...Try again "; lblerror.ForeColor = System.Drawing.Color.Red; txt_email.Text = string.Empty;
txt_email.Focus();

}

}
}
}
