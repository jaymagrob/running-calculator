import NextLink from "next/link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function Footer() {
  const navItems = [
    { href: "/privacy-policy", name: "Privacy Policy" },
    { href: "/terms-of-use", name: "Terms Of Use" },
  ];

  return (
    <footer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            whiteSpace: "nowrap",
          }}
        >
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                href={item.href}
                component={NextLink}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        © 2023 Magnus Klein Ltd
      </Box>
    </footer>
  );
}
