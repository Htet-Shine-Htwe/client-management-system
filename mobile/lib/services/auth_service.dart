import 'dart:convert';
import 'dart:io'; // To handle potential network errors
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class AuthService {
  final String _baseUrl = 'http://localhost:8000/api/v1';
  final FlutterSecureStorage _storage = FlutterSecureStorage();

  Future<bool> login(String code, String password) async {
    try {
      final url = Uri.parse('$_baseUrl/login');
      final response = await http.post(
        url,
        body: {'code': code, 'password': password},
      );

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        await _storage.write(key: 'token', value: responseData['token']);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // Handle the error properly (log it, notify user, etc.)
      print("Error during login: $error");
      return false;
    }
  }

  Future<void> logout() async {
    await _storage.delete(key: 'token');
  }

  Future<String?> getToken() async {
    return await _storage.read(key: 'token');
  }
}
