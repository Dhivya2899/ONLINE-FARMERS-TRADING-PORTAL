//DELIVERY OPTION

using System;
using System.Collections.Generic; using System.Linq;
using System.Web; using System.Web.UI;
using System.Web.UI.WebControls; using System.Data;
using System.Data.SqlClient; using System.Configuration; using System.IO;

public partial class Delivery_option : System.Web.UI.Page
{
protected void Page_Load(object sender, EventArgs e)
{
if (!IsPostBack)
{
BindBrand(); BindMainCategory(); BindGender(); BindrptrSize();
}
}
private void BindrptrSize()
{
using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["framertrader"].ConnectionStri ng))
{
using (SqlCommand cmd = new SqlCommand("select A.*,B.*,C.*,D.*,E.* from
tbldelivery A with(nolock) inner join tblCategory B on B.CatID =a.CategoryID inner join tbldistrict C on C.DisID =A.DistrictID inner join tblSubCategory D on D.SubCatID
=A.SubCategoryID inner join tblother E on E.OtherID =A.OtherID ", con))
{
using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
{
DataTable dt = new DataTable(); sda.Fill(dt);
rptrSize.DataSource = dt; rptrSize.DataBind();
}
}
}
}

private void BindMainCategory()
{
 
using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["framertrader"].ConnectionStri ng))
{
con.Open();
SqlCommand cmd = new SqlCommand("Select * from tblCategory", con); SqlDataAdapter sda = new SqlDataAdapter(cmd);
DataTable dt = new DataTable(); sda.Fill(dt);
if (dt.Rows.Count != 0)
{
ddlcategory.DataSource = dt; ddlcategory.DataTextField = "CatName"; ddlcategory.DataValueField = "CatID"; ddlcategory.DataBind();
ddlcategory.Items.Insert(0, new ListItem("-Select-", "0"));

}
}
}

private void BindBrand()
{
using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["framertrader"].ConnectionStri ng))
{
con.Open();
SqlCommand cmd = new SqlCommand("Select * from tbldistrict", con); SqlDataAdapter sda = new SqlDataAdapter(cmd);
DataTable dt = new DataTable(); sda.Fill(dt);
if (dt.Rows.Count != 0)
{
ddldistrict.DataSource = dt; ddldistrict.DataTextField = "DisName"; ddldistrict.DataValueField = "DisID"; ddldistrict.DataBind();
ddldistrict.Items.Insert(0, new ListItem("-Select-", "0"));

}
}
}

private void BindGender()
{
using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["framertrader"].ConnectionStri ng))
{
 


con);
 
con.Open();
SqlCommand cmd = new SqlCommand("Select * from tblother with(nolock)",

SqlDataAdapter sda = new SqlDataAdapter(cmd); DataTable dt = new DataTable();
sda.Fill(dt);
if (dt.Rows.Count != 0)
{
 
ddlother.DataSource = dt; ddlother.DataTextField = "OtherName"; ddlother.DataValueField = "OtherID"; ddlother.DataBind();
ddlother.Items.Insert(0, new ListItem("-Select-", "0"));

}
}
}




protected void ddlcategory_SelectedIndexChanged(object sender, EventArgs e)
{
int MainCategoryID = Convert.ToInt32(ddlcategory.SelectedItem.Value);

using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["framertrader"].ConnectionStri ng))
{
con.Open();
SqlCommand cmd = new SqlCommand("Select * from tblSubCategory where
MainCatID='" + ddlcategory.SelectedItem.Value + "'", con); SqlDataAdapter sda = new SqlDataAdapter(cmd); DataTable dt = new DataTable();
sda.Fill(dt);
if (dt.Rows.Count != 0)
{
ddlsubcat.DataSource = dt; ddlsubcat.DataTextField = "SubCatName"; ddlsubcat.DataValueField = "SubCatID"; ddlsubcat.DataBind();
ddlsubcat.Items.Insert(0, new ListItem("-Select-", "0"));

}
}
}
 
protected void btnadd_Click(object sender, EventArgs e)
{
{

using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["framertrader"].ConnectionStri ng))
{
con.Open();
SqlCommand cmd = new SqlCommand("Insert into
tbldelivery(DeliveryName,DistrictID,CategoryID,SubCategoryID,OtherID) Values('" + txt_delivery.Text + "','" + ddldistrict.SelectedItem.Value + "','" + ddlcategory.SelectedItem.Value + "','" + ddlsubcat.SelectedItem.Value + "','" + ddlother.SelectedItem.Value + "')", con);
cmd.ExecuteNonQuery();

Response.Write("<script> alert('Size Added Successfully '); </script>"); txt_delivery.Text = string.Empty;

con.Close(); ddldistrict.ClearSelection();
ddldistrict.Items.FindByValue("0").Selected = true;

ddlcategory.ClearSelection(); ddlcategory.Items.FindByValue("0").Selected = true;


ddlsubcat.ClearSelection(); ddlsubcat.Items.FindByValue("0").Selected = true;

ddlother.ClearSelection(); ddlother.Items.FindByValue("0").Selected = true;

}
BindrptrSize();
}
}
}
