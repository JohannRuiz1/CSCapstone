package com.example.vtresearchconnect.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

@Component
public class JWTUtil {

    private Key SECRET_KEY;
    private String encodedKey; // For debugging
    private Set<String> invalidatedTokens; // Set to store invalidated tokens


    @PostConstruct
    public void init() {
        SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        encodedKey = Base64.getEncoder().encodeToString(SECRET_KEY.getEncoded());
        invalidatedTokens = new HashSet<>();
        //System.out.println("Initialized SECRET_KEY: " + encodedKey); // Debug: Print encoded key
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        //System.out.println("Using SECRET_KEY for parsing: " + encodedKey); // Debug: Confirm key used for parsing
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Token validity 10 hours
                .signWith(SECRET_KEY)
                .compact();
    }

    public String generateSignupToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "ADMIN");
        String token =  Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 10)) // Token validity 10 minutes
                .signWith(SECRET_KEY)
                .compact();

        System.out.println("Generated Token: " + token); // Add this line
        return token;
    }

    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        boolean valid = (extractedUsername.equals(username) && !isTokenExpired(token) && !invalidatedTokens.contains(token));
        //System.out.println("Token validation result for " + username + ": " + valid); // Debug: Print validation result
        return valid;
    }

    public void invalidateToken(String token) {
        invalidatedTokens.add(token);
    }

    public boolean isTokenInvalidated(String token) {
        return invalidatedTokens.contains(token);
    }
}
