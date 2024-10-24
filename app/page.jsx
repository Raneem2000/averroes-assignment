import { Typography, Box } from "@mui/material";
import Link from "next/link";
const styles = {
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    marginTop: "20px",
  },
  headText: {
    fontSize: { xs: "3rem", sm: "4rem" },
    fontWeight: "800",
    lineHeight: 1.15,
    color: "black",
    marginTop: "20px",
  },
  orangeGradient: {
    background: "linear-gradient(to right, #3b82f6, #06b6d4, #34d399)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  desc: {
    fontSize: "1.25rem",
    marginTop: "10px",
    color: "#555",
    maxWidth: "400px",
    margin: "10px",
  },
};

export default function Home() {
  return (
    <Box sx={styles.section}>
      <Typography sx={styles.headText}>
        Explore & Innovate
        <br />
        <Box component="span" sx={styles.orangeGradient}>
          Powered by AI Excellence
        </Box>
      </Typography>
      <Typography sx={styles.desc}>
        Averroes.ai is at the forefront of artificial intelligence, offering
        cutting-edge solutions that empower users to unlock their creative
        potential and drive innovation in the modern world.
      </Typography>
      <Link href="/categories" passHref>
        <Typography sx={{ color: "#06b6d4" }}>
          Go TO SEE OUR CATEGORIES
        </Typography>
      </Link>
      <Link href="/images" passHref>
        <Typography sx={{ color: "#3b82f6", marginTop: "15px" }}>
          Go TO SEE IMAGES GALERY
        </Typography>
      </Link>
    </Box>
  );
}
